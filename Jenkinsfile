pipeline {
    agent {label "!master"}
    stages {
        stage ('Chekout'){
            steps {
                cleanWs()
                dir('sources'){
                    git url: 'https://github.com/oscarvx00/sitas-frontend-v2', branch: 'main'
                }
            }
        }
        stage('Test') {
            environment {
                scannerHome = tool 'SonarQubeScanner'
                QMETRY_APIKEY = credentials("QMETRY_APIKEY")
            }
            steps {
                dir('test') {
                    sh 'cp -r -a ../sources/. ./'
                    sh 'cp -r -a containers/test/. ./'
                    
                    sh """
                    docker build -t sitas-frontend-test-v2  .
                    """
                    
                    sh "docker run --name sitas-frontend-test-container-v2 sitas-frontend-test-v2"
                    sh "mkdir coverage"
                    sh "docker cp sitas-frontend-test-container-v2:/sitas-frontend-test-v2/coverage/. ./coverage"
                    sh "docker cp sitas-frontend-test-container-v2:/sitas-frontend-test-v2/junit.xml ./junit.xml"
                    //sh "docker container rm sitas-frontend-test-container-v2"
                    //sh "docker image rm sitas-frontend-test"

                    //sh "qmetry-cli import-results -s 'https://qtmcloud.qmetry.com/rest/api/automation/importresult' -apiKey '${QMETRY_APIKEY}' -f 'junit.xml'"
                    
                    withSonarQubeEnv('sonarqube'){
                        sh "${scannerHome}/bin/sonar-scanner"
                    }
                    script {
                        def qualitygate = waitForQualityGate()
                        if(qualitygate.status != 'OK'){
                            error "Pipeline aborted due to quality gate coverage failure."
                        }
                    }
                }
            }
        }
        stage('Upload Result to QTM'){
            environment {
                QMETRY_APIKEY = credentials("QMETRY_SITAS")
            }
            steps {
                sh "docker cp sitas-frontend-test-container-v2:/sitas-frontend-test-v2/junit.xml ./junit.xml"
                sh "docker container rm sitas-frontend-test-container-v2"
                step([$class: 'TestReportDeployPublisherCloudV4', testToRun: 'CLOUD', apikey: "${QMETRY_APIKEY}", format: 'junit/xml', file: './junit.xml', testCycleToReuse: "", attachFile: true, 
                environment: "", build: "",testCycleLabels: "", testCycleComponents: "", testCyclePriority: "Medium", testCycleStatus: "Done", testCycleSprintId: "", testCycleFixVersionId: "", testCycleSummary: "Test react cycle", testCaseLabels: "", testCaseComponents: "", testCasePriority: "Medium", testCaseStatus: "Done", testCaseSprintId: "", testCaseFixVersionId: ""
                ])
            }   
        } 
        stage ('Deploy'){
            steps {
                dir('deploy') {
                    sh 'cp -r -a ../sources/. ./'
                    sh 'cp -r -a containers/prod/. ./'
                    
                    sh """
                    docker build -t oscarvicente/sitas-frontend-prod-v2  .
                    """
                    withCredentials([string(credentialsId: 'dockerhub-pass', variable: 'pass')]) {
                        sh "docker login --username oscarvicente --password $pass; docker push oscarvicente/sitas-frontend-prod-v2"
                    }
        
                    //Deploy in k8s, server configured
                    dir('kube'){
                        sh 'kubectl delete deploy -n sitas sitas-frontend-v2'
                        sh 'kubectl apply -f sitas-frontend-v2-deploy.yaml'
                        sh 'kubectl apply -f sitas-frontend-v2-service.yaml'
                    }
                }
            }
            
        }
    }
}