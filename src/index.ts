import expTable from './db/exp_table.json'

export type levelType = keyof typeof expTable

export function getRequiredEXP(level: number) {
    if (Object.keys(expTable).includes(level.toString())) {
        return expTable[level as unknown as levelType]
    }
}

export function getAccumulateExp(until: number) {
    return Array.from({ length: until }, (_, i) => i + 1)
        .map(one => getRequiredEXP(one) || 0)
        .reduce((a, b) => a + b)
}

export function clac_level(exp: number) {
    let accumulate = 0
    let level = 1
    for (let x = 1; x <= Object.keys(expTable).length; x++) {
        accumulate += getRequiredEXP(x)!
        if (exp >= accumulate) level++
        else break
    }
    return level
}