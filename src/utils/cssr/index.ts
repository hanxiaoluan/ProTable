import CssRender from 'css-render'
import BEMPlugin from '@css-render/plugin-bem'

const namespace = 'pro-table'
const prefix = `.${namespace}-`
const elementPrefix = '__'
const modifierPrefix = '--'

const cssr = CssRender()
const plugin = BEMPlugin({
	blockPrefix: prefix,
	elementPrefix,
	modifierPrefix
})
cssr.use(plugin)
const { c, find } = cssr
const { cB, cE, cM, cNotM } = plugin

export {
	c, find, cB, cE, cM, cNotM
}
