terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket = "your-terraform-state-bucket"
    key    = "app-infrastructure/terraform.tfstate"
    region = "us-east-1"
  }
}
