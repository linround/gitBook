const component = {
    data() {
        return {}
    },
    render(createElement) {
        const body = this.$slots.body || []
        const footer = this.$slots.footer || []
        const def = this.$slots.default || []
        return createElement(
            'div', {}, ['你好', ...def, ...body, ...footer]
        )
    },
}
