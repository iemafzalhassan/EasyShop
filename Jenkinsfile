@Library('easyshop-shared-lib@main') _

pipeline {
    agent any
    
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE_NAME = 'iemafzal/easyshop'
        DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
        NOTIFICATION_EMAIL = 'iemafzalhassan@gmail.com'
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Starting pipeline execution..."
                    cleanWs()
                    checkout scm
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    try {
                        buildDockerImages()
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error "Failed to build Docker images: ${e.message}"
                    }
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    try {
                        pushToDockerHub()
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error "Failed to push Docker images: ${e.message}"
                    }
                }
            }
        }
        
        stage('Deploy to Production') {
            steps {
                script {
                    try {
                        deployToProd()
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error "Failed to deploy: ${e.message}"
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            script {
                currentBuild.result = 'SUCCESS'
                emailNotification('SUCCESS')
            }
        }
        failure {
            script {
                currentBuild.result = 'FAILURE'
                emailNotification('FAILURE')
            }
        }
    }
}
