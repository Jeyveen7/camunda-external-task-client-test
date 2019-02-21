module.exports = {
  findProcess:function(processName){
    return findProcess(processName);
  }
}

function findProcess(processName){
  const processes = require('../config/processes-config.json');
  let process;

  for(let i=0;i<processes.length;i++){
    if(processes[i].name == processName){
      process = processes[i];
      break;
    }
  }
  return process;
}