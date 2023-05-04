var { ComponentLoader } = require('adminjs')

const componentLoader = new ComponentLoader()

const Components = {
    Dashboard: componentLoader.add('Dashboard', './dashboard'),
    //MyInput: componentLoader.add('MyInput', './my-input'),
    // other custom components
}

module.exports = {componentLoader, Components}