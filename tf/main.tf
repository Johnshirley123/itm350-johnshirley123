provider "aws" {
  region = var.region
}

resource "aws_vpc" "app_vpc" {
  cidr_block = var.vpc_cidr
  enable_dns_support = true
  enable_dns_hostnames = true
  tags = {
    Name = "AppVPC"
  }
}

resource "aws_subnet" "public_subnet_a" {
  vpc_id                  = aws_vpc.app_vpc.id
  cidr_block              = var.public_subnet_a_cidr
  availability_zone       = var.public_subnet_a_az
  map_public_ip_on_launch = true
  tags = {
    Name = "PublicSubnetA"
  }
}

resource "aws_subnet" "public_subnet_b" {
  vpc_id                  = aws_vpc.app_vpc.id
  cidr_block              = var.public_subnet_b_cidr
  availability_zone       = var.public_subnet_b_az
  map_public_ip_on_launch = true
  tags = {
    Name = "PublicSubnetB"
  }
}

resource "aws_subnet" "private_subnet_a" {
  vpc_id                  = aws_vpc.app_vpc.id
  cidr_block              = var.private_subnet_a_cidr
  availability_zone       = var.private_subnet_a_az
  tags = {
    Name = "PrivateSubnetA"
  }
}

resource "aws_subnet" "private_subnet_b" {
  vpc_id                  = aws_vpc.app_vpc.id
  cidr_block              = var.private_subnet_b_cidr
  availability_zone       = var.private_subnet_b_az
  tags = {
    Name = "PrivateSubnetB"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.app_vpc.id
  tags = {
    Name = "AppIGW"
  }
}

resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat_gw.id
  subnet_id     = aws_subnet.public_subnet_a.id
  tags = {
    Name = "AppNATGW"
  }
}

resource "aws_eip" "nat_gw" {
  vpc = true
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.app_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
  tags = {
    Name = "PublicRouteTable"
  }
}

resource "aws_route_table" "private_route_table" {
  vpc_id = aws_vpc.app_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }
  tags = {
    Name = "PrivateRouteTable"
  }
}

resource "aws_route_table_association" "public_subnet_a_association" {
  subnet_id      = aws_subnet.public_subnet_a.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "public_subnet_b_association" {
  subnet_id      = aws_subnet.public_subnet_b.id
  route_table_id = aws_route_table.public_route_table.id
}

resource "aws_route_table_association" "private_subnet_a_association" {
  subnet_id      = aws_subnet.private_subnet_a.id
  route_table_id = aws_route_table.private_route_table.id
}

resource "aws_route_table_association" "private_subnet_b_association" {
  subnet_id      = aws_subnet.private_subnet_b.id
  route_table_id = aws_route_table.private_route_table.id
}

resource "aws_security_group" "http_sg" {
  name        = "http_sg"
  description = "Security group allowing HTTP traffic"
  vpc_id      = aws_vpc.app_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "node_sg" {
  name        = "node_sg"
  description = "Security group for ECS nodes"
  vpc_id      = aws_vpc.app_vpc.id

  ingress {
    from_port   = 32153
    to_port     = 65535
    protocol    = "tcp"
    security_groups = [aws_security_group.http_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "alb_sg" {
  name        = "alb_sg"
  description = "Security group for the Application Load Balancer"
  vpc_id      = aws_vpc.app_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_lb" "app_alb" {
  name               = "app-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups   = [aws_security_group.alb_sg.id]
  subnets            = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]
  enable_deletion_protection = false
}

resource "aws_lb_target_group" "app_target_group" {
  name     = "app-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.app_vpc.id
}

resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.app_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "fixed-response"
    fixed_response {
      status_code = 200
      content_type = "text/plain"
      message_body = "OK"
    }
  }
}

resource "aws_launch_template" "ecs_launch_template" {
  name_prefix   = "ecs-launch-template"
  image_id      = var.ami_id
  instance_type = var.instance_type
  key_name      = var.key_pair_name

  security_group_names = [aws_security_group.node_sg.name]
}

resource "aws_autoscaling_group" "ecs_asg" {
  desired_capacity     = 2
  max_size             = 3
  min_size             = 1
  vpc_zone_identifier  = [aws_subnet.private_subnet_a.id, aws_subnet.private_subnet_b.id]
  launch_template {
    launch_template_name = aws_launch_template.ecs_launch_template.name
    version              = "$Latest"
  }
  target_group_arns    = [aws_lb_target_group.app_target_group.arn]
  health_check_type    = "EC2"
  health_check_grace_period = 300
}

resource "aws_ecs_cluster" "app_cluster" {
  name = "app-cluster"
}

resource "aws_ecs_capacity_provider" "app_capacity_provider" {
  name = "app-capacity-provider"
  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.ecs_asg.arn
  }
}

resource "aws_ecs_task_definition" "app_task" {
  family                   = "app-task"
  network_mode             = "awsvpc"
  container_definitions    = file("container_definitions.json")
  requires_compatibilities = ["FARGATE"]
}

resource "aws_ecs_service" "app_service" {
  name            = "app-service"
  cluster         = aws_ecs_cluster.app_cluster.id
  task_definition = aws_ecs_task_definition.app_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    subnets          = [aws_subnet.private_subnet_a.id, aws_subnet.private_subnet_b.id]
    security_groups = [aws_security_group.node_sg.id]
  }
}
