class Interface {
  constructor(dataStorage) {
    this.data = dataStorage ? dataStorage : {};
  }

  performAction(action) {
    if (action.action === 'ASSIGN') {
      const content = this.evaluateContent(action.content);
      this.assignToIdentifier(action.identifier, content);
    } else if (action.action === 'CALL') {
      this.invokeFunction(action.identifier, action.parameters);
    } else if (action.action === 'PRINT') {
      this.printVariable(action.identifier);
    }
  }

  performActions(actionsArray) {
    actionsArray.forEach((action) => {
      this.performAction(action);
    }, this);

  }

  evaluateContent(content) {
    if (content.action === 'NEW') {
      const objectClass = content.objectClass;
      const instance = new this.data[objectClass](...content.parameters);
      return instance;
    } else if (content.action === 'CALL') {
      return this.invokeFunction(content.identifier, content.parameters);
    } else if (content.identifier) {
      return this.getIdentfier(content.identifier);
    } else {
      return content;
    }
  }

  assignToIdentifier(identifierArray, value) {
    let currentLevel = this.data;
    for (let i = 0; i <= identifierArray.length - 1; i++) {
      if (!currentLevel[identifierArray[i]] && i === identifierArray.length - 1) {
        currentLevel[identifierArray[i]] = value;
      }
      currentLevel = currentLevel[identifierArray[i]];
    }
  }

  getIdentfier(identifierArray) {
    let currentLevel = this.data;
    for (let i = 0; i <= identifierArray.length - 1; i++) {
      if (currentLevel[identifierArray[i]] === undefined && i === identifierArray.length - 1) {
        return undefined;
      }
      currentLevel = currentLevel[identifierArray[i]];
    }
    return currentLevel;
  }

  invokeFunction(identifierArray, parameterArray) {
    const parameterValueArray = [];
    parameterArray.forEach((parameter) => {
      if(parameter.identifier !== undefined) {
        parameterValueArray.push(this.evaluateContent(parameter))
      } else {
        parameterValueArray.push(parameter);
      }
    }, this);
    const funcObject = this.getIdentfier(identifierArray.slice(0, identifierArray.length - 1));
    if (typeof funcObject[identifierArray[identifierArray.length-1]] === 'function') {
      return funcObject[identifierArray[identifierArray.length-1]](...parameterValueArray);
    }
  }

  printVariable(identifierArray) {
    const variableContent = this.getIdentfier(identifierArray);
    if (variableContent !== undefined) {
      console.log(JSON.stringify(variableContent));
    } else {
      console.log(`Variable '${identifierArray}' not found.`);
    }
  }
}


module.exports = {Interface}
