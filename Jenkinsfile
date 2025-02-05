@Library('easyshop-shared-lib') _

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
                cleanWs()
                checkout scm
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    securityScan()
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                script {
                    buildDockerImages()
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    pushToDockerHub()
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    deployToStaging()
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    deployToProd()
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
            emailNotification(currentBuild.result)
        }
    }
}
