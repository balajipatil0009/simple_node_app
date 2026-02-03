pipeline{
    agent any
    tools{
       nodejs "node22"
    }
    stages{
        stage("pull and install deps"){
            steps{
             git branch: 'main',
                 credentialsId:"git-cred",
                 url:"https://github.com/balajipatil0009/simple_node_app.git"
             dir("app"){
                sh "npm ci"
                sh 'ls -la'
             }
            }

        }
        stage("build and push"){
            steps{
                dir("app"){
                  script{
                      withCredentials([usernamePassword(
                        credentialsId:'docker-cred',
                        passwordVariable:'dockerPass',
                        usernameVariable:'dockerUser'
                    )]){
                        sh 'echo ${dockerPass} | docker login -u ${dockerUser} --password-stdin'
                        sh 'docker buildx build -t ${dockerUser}/node-01:${BUILD_NUMBER} .' 
                        sh 'docker push ${dockerUser}/node-01:${BUILD_NUMBER}'
                        sh 'docker tag ${dockerUser}/node-01:${BUILD_NUMBER} ${dockerUser}/node-01:latest'
                        sh 'docker push ${dockerUser}/node-01:latest'
                    }
                  }
                }
            }
        }
        stage("deploy"){
            steps{
                script{
                    def containerName = "node-01"

                    sh 'docker stop ${containerName} || true'
                    sh 'docker rm ${containerName} || true'
                    sh 'docker run -d --name ${containerName} -p 3000:3000 ${dockerUser}/node-01:latest'
                }
            }
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}
