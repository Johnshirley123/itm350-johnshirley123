variable "region" {
  description = "AWS region to deploy the infrastructure"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "public_subnet_a_cidr" {
  description = "CIDR block for the public subnet A"
  type        = string
}

variable "public_subnet_b_cidr" {
  description = "CIDR block for the public subnet B"
  type        = string
}

variable "private_subnet_a_cidr" {
  description = "CIDR block for the private subnet A"
  type        = string
}

variable "private_subnet_b_cidr" {
  description = "CIDR block for the private subnet B"
  type        = string
}

variable "public_subnet_a_az" {
  description = "Availability zone for the public subnet A"
  type        = string
}

variable "public_subnet_b_az" {
  description = "Availability zone for the public subnet B"
  type        = string
}

variable "private_subnet_a_az" {
  description = "Availability zone for the private subnet A"
  type        = string
}

variable "private_subnet_b_az" {
  description = "Availability zone for the private subnet B"
  type        = string
}

variable "ami_id" {
  description = "AMI ID to use for instances"
  type        = string
}

variable "instance_type" {
  description = "Instance type for ECS nodes"
  type        = string
}

variable "key_pair_name" {
  description = "Name of the SSH key pair"
  type        = string
}
