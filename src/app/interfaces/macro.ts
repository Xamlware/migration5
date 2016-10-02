export interface IMacro {
    calories: number;
    macroCarb: number;
    macroProtein: number;
    macroFat: number;
}

export class BaseMacro implements IMacro {
    calories: number;
    macroCarb: number;
    macroProtein: number;
    macroFat: number;

    constructor(calories: number , carbs: number, protein: number, fat: number) {
        this.calories = calories;
        this.macroCarb = carbs;
        this.macroProtein = protein;
        this.macroFat = fat;
    }
}

export class BaseMacroString {
    calories: string;
    macroCarb: string;
    macroProtein: string;
    macroFat: string;

    constructor(calories: string , carbs: string, protein: string, fat: string) {
        this.calories = calories;
        this.macroCarb = carbs;
        this.macroProtein = protein;
        this.macroFat = fat;
    }
}

export class GridMacroString {
    calories: string;
    calColor: string;
    macroCarb: string;
    carColor: string;
    macroProtein: string;
    proColor: string;
    macroFat: string;
    fatColor: string;

    constructor(calories: string , carbs: string, protein: string, fat: string) {
        this.calories = calories;
        this.macroCarb = carbs;
        this.macroProtein = protein;
        this.macroFat = fat;
        this.calColor = "Green";
        this.carColor = "Green";
        this.proColor = "Green";
        this.fatColor = "Green";
    }
}


export class Macro implements IMacro {
    calories: number = 0;
    carbCals: number = 0;
    macroCarb: number = 0;
    carbPercent: number = 0;
    proteinCals: number = 0;
    macroProtein: number = 0;
    proteinPercent: number = 0;
    fatCals: number = 0;
    macroFat: number = 0;
    fatPercent: number = 0;

    // calculateCarbPercent() {
    //     return this.carbCals / (this.carbCals + this.proteinCals + this.fatCals) 
    // }

    // calculateProteinPercent() {
    //     return this.proteinCals / (this.carbCals + this.proteinCals + this.fatCals) 
    // }

    // calculateFatPercent() {
    //     return this.fatCals / (this.carbCals + this.proteinCals + this.fatCals) 
    // }

}