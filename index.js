const number_of_cells = 200

let last_row

function get_random_class(cell) {
    const rand = () => Math.random() > 0.5
    return rand() ? 'active' : 'inactive'
}

function get_rule_class(cell, i) {
    const value = cell => cell.classList.contains('active')

    let children = last_row.children
    let left = value(children[i - 1] || children[number_of_cells - 1])
    let center = value(children[i])
    let right = value(children[i + 1] || children[0])

    let active =
        rule(1, 1, 1)
            .and(1, 0, 0)
            .and(0, 1, 0)
            .and(0, 0, 1)
            .eval(left, center, right)

    return active ? 'active' : 'inactive'
}

function createRow(get_class) {
    let row = document.createElement('div')
    document.body.appendChild(row)
    for (let i = 0; i < number_of_cells; i++) {
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.style.width = window.innerWidth / number_of_cells
        cell.classList.add(get_class(cell, i))
        row.appendChild(cell)
    }
    last_row = row
}

function rule(a, b, c, rules) {
    rules = rules || []
    rules.push([a, b, c])

    return {
        rules: rules,
        and: (a, b, c) => rule(a, b, c, rules),
        eval: (a, b, c) =>
            rules.some(x => x[0] == a && x[1] == b && x[2] == c)
    }
}

createRow(get_random_class)

function nextRow() {
    createRow(get_rule_class)
}

setInterval(nextRow, 100)