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
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed======= ="
        }
    }
}
