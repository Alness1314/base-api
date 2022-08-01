/**
 * Converts an enum into a String
 * @param _enum Enum
 * @returns string type
 */

export const EnumToString = (_enum: object) =>
    Object.keys(_enum)
        .map((key) => _enum[key])
        .filter((value) => typeof value === 'string') as string[];;