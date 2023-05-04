var { ComponentLoader } = require('adminjs')

const componentLoader = new ComponentLoader()
//sets up custom dashboard as component for adminjs
const Components = {
    Dashboard: componentLoader.add('Dashboard', './dashboard'),
    // other custom components
}

module.exports = {componentLoader, Components}
