output "vpc_id" {
  value = aws_vpc.app_vpc.id
}

output "public_subnets" {
  value = [aws_subnet.public_subnet_a.id, aws_subnet.public_subnet_b.id]
}

output "private_subnets" {
  value = [aws_subnet.private_subnet_a.id, aws_subnet.private_subnet_b.id]
}

output "alb_url" {
  value = aws_lb.app_alb.dns_name
}

output "ecs_cluster_name" {
  value = aws_ecs_cluster.app_cluster.name
}
