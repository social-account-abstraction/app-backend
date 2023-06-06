pipeline {
    agent none
    environment {
       TELEGRAM_CHAT_ID = "-498313790"
       SHORTCOMMIT=""
   }
    options {
        buildDiscarder(logRotator(numToKeepStr: '30'))
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        gitLabConnection('default')
    }
    triggers {
        gitlab(triggerOnPush: true, triggerOnMergeRequest: true, branchFilterType: 'All')
    }

    stages {
        stage('Build docker image'){
            agent { node 'master' }
                steps {
                    running("${STAGE_NAME}")
                    git([
                        url: "git@github.com:social-account-abstraction/app-backend.git",
                        branch: "${env.BRANCH_NAME}",
                    ])
                    script {
                        env.registry = "repo.mind-dev.com/mind-dev"
                        env.app_name = "social-account-backend"
                        SHORTCOMMIT=sh(returnStdout: true, script: "git log -n 1 --pretty=format:'subject:%s, short hash: %h, author: is %an'").trim()
                    }
                    sh('''#!/bin/bash
                    echo "Building docker image"
                    docker build  -t \$registry/\${app_name}:\${BUILD_NUMBER} .
                    docker tag \$registry/\${app_name}:\${BUILD_NUMBER} \$registry/\${app_name}:${BRANCH_NAME}
                    docker push \$registry/\${app_name}:${BRANCH_NAME}
                    ''')
                }
             post {
                success {
                    success("${STAGE_NAME}")
                }
                failure {
                    failure("${STAGE_NAME}")
                }
              }
            }
            stage('Deploy prod') {
                agent { node 'develop2' }
                when  { branch 'main' }
                    steps {
                        running("${STAGE_NAME}")
                        sh('''#!/bin/bash 
                        cd /var/www/asecapital
                        docker-compose pull
                        docker-compose up -d 
                        ''')
                    }
                post {
                   success {
                   success("${STAGE_NAME}")
                   }
                failure {
                   failure("${STAGE_NAME}")
                   }
                }
                    
            }

                
    }
    post { 
        success {
             node('master'){
                 withCredentials([string(credentialsId: 'TELEGRAM_BOT_ID', variable: 'TELEGRAM_BOT_ID'),
                                  string(credentialsId: 'TELEGRAM_BOT_TOKEN', variable: 'TELEGRAM_BOT_TOKEN')]) {
                    script {
                        message = "Build #${currentBuild.number} ${SHORTCOMMIT} completed successful on sto-backend ${env.BRANCH_NAME}"
                        sendMessageToTelegramChanel(env.TELEGRAM_CHAT_ID, env.TELEGRAM_BOT_ID, env.TELEGRAM_BOT_TOKEN, message)
                    }
 
                }
             }    
        }
        failure {
            node('master'){
                withCredentials([string(credentialsId: 'TELEGRAM_BOT_ID', variable: 'TELEGRAM_BOT_ID'),
                                 string(credentialsId: 'TELEGRAM_BOT_TOKEN', variable: 'TELEGRAM_BOT_TOKEN')]) {
                    script {
                        message = "Build #${currentBuild.number} ${SHORTCOMMIT} completed failure on sto-backend ${env.BRANCH_NAME}"
                        sendMessageToTelegramChanel(env.TELEGRAM_CHAT_ID, env.TELEGRAM_BOT_ID, env.TELEGRAM_BOT_TOKEN, message)
                 }
               } 
        }
      }
    }
}
def running(gitlabBuildName) {
    updateGitlabCommitStatus(name: "${gitlabBuildName}", state: 'running')
}

def success(gitlabBuildName) {
    updateGitlabCommitStatus(name: "${gitlabBuildName}", state: 'success')
}

def failure(gitlabBuildName) {
    updateGitlabCommitStatus(name: "${gitlabBuildName}", state: 'failed')
}
def sendMessageToTelegramChanel(chatId, botId, botToken, message) {
        message = java.net.URLEncoder.encode(message, "UTF-8")
        sh "curl -s --socks5-hostname 127.0.0.1:9050 -X POST https://api.telegram.org/bot${botId}:${botToken}/sendMessage -d chat_id=${chatId} -d text=${message}"
}
