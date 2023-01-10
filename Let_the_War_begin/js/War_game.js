/*
 * Main file for War Game.
 * 
 * 
 * Author: Jon Håkon Lia <jonlia28@innlandetfylke.no>
 */

// Declaring global variables
const army_size = 10;
let Team_Blue_size =Math.floor(Math.random() * army_size);
let Team_Red_size = Math.floor(Math.random() * army_size);

let Team_Blue = [];
let Team_Red = [];

const max_health = 10;
const inital_max_experience = 3;
const max_experience = 10;
const weapon_fraction = [0.3, 0.4, 0.3];

/*
 * Creating a class to represent a warrior, with three attributes.
 * 
 */
class Warrior {
    constructor(experience, weapon) {
        this._health = max_health;
        this._experience = experience;
        this._weapon = weapon;
    };

    get health() {
        return this._health;
    };

    get experience() {
        return this._experience;
    };

    get weapon() {
        return this._weapon;
    };

    update_weapon (warrior) {
        //Cheching if warriors is dead.
        if (warrior.health === 0) {
            // Take the opponents weapon if its better than your own
            if (warrior.weapon > this._weapon) {
                this._weapon = warrior.weapon; 
                console.log(this.weapon);
            };
        };
        
    };

    update_health (healthChange) {
        // Health degree is increased or decreased for alive warriors
        console.log(healthChange);
        if (this._health == 0) {
            return;
        };

        let new_health = this._health + healthChange;
        if (new_health > max_health) {
            this._health = max_health
        }
        else if (new_health < 0) {
            this._health = 0;
        }
        else {
            this._health = new_health;
            console.log(this.health);
        };
        
    };

    add_experience() {
        // Increase experience for alive warriors
        if (this._health > 0) {
            if (this._experience > 10) {
                this._experience+= 1;
            };
        };
    }; 
};



/*
 * This function makes two arrays of warriors for each team.
 * Draw which weapon type and draw experience for each warrior.
 * Using specified probabilities
 */

function init_army (Team, Team_size) {
    for (let i = 0; i < Team_size; i++) {
        let experience = Math.floor(Math.random() * inital_max_experience);
        let rnd = Math.random();
        console.log(rnd);
        let cum_prob = [weapon_fraction[0], weapon_fraction[0] + weapon_fraction[1]];
        console.log(cum_prob);
        let weapon;

        if (rnd < cum_prob[0]) {
            weapon = 0;
        }
        else if (rnd < cum_prob[1]) {
            weapon = 1;
        }
        else {
            weapon = 2;
        }

        let new_warrior = new Warrior(experience, weapon);
        console.log(new_warrior);
        Team.push(new_warrior);
    };
};


/*
 * Shuffel array function host documented by: https://stackoverflow.com/questions/60755915/how-to-combine-first-element-of-one-array-with-first-element-of-second-array-and
 */
function draw_sequence () {

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    let n_Red = Team_Red.length;
    let n_Blue = Team_Blue.length;

    if (n_Red > n_Blue) {
        shuffleArray(Team_Blue);
    }
    else {
        shuffleArray(Team_Red);
    };

};

function duel (Red_warrior, Blue_warrior) {
    const probW = [ [0.5, 0.2, 0.1], [0.8, 0.5, 0.2], [0.9, 0.8, 0.5]];
    let prob_Red_W = probW[Red_warrior.weapon][Blue_warrior.weapon];
    let prob_Blue_W = 1 - prob_Red_W;
    let prob_Blue_E = Blue_warrior.experience / (Red_warrior.experience + Blue_warrior.experience);
    let prob_Red_E = Red_warrior.experience / (Red_warrior.experience + Blue_warrior.experience);
    let prob_Blue = prob_Blue_W * prob_Blue_E;
    let prob_Red = prob_Red_W * prob_Red_E;
    prob_Red = prob_Red / (prob_Blue + prob_Red);
    
    if (Red_warrior.health == 0 || Blue_warrior.health == 0) {
        if(Red_warrior.health > 0) {
            Red_warrior.update_health(1);
        };
        
        if(Blue_warrior.health > 0) {
            Blue_warrior.update_health(1);
        };
        //No Battle between a dead and a living warrior.
        return; 
    };

    if (Math.random() < prob_Red) {
        // Red won.
        console.log("Red won");
    }
    else {
        // Blue won.
        console.log("Blue won");
        Blue_warrior.update_health(1);
        Red_warrior.update_health(-Blue_warrior.weapon * 4);
        Blue_warrior.update_weapon(Red_warrior);
    };
};

/*
 * Creating a function to test how many members of one of the armys are still live.
 */

function get_num_of_alive_team_members (Team) {
    let count = 0;

    for (i = 0; i < Team.length; i++) {
        if (Team[i].health > 0) {
        count++;        
        };
    };
    return count;
};

function alive_members (Team) {
    let sum = 0;
    for (i = 0; i < Team.length; i++) {
        if (Team[i].health > 0) {
            sum++;
        };
    };

    return sum;
};

function average_health(Team) {
    let sum = 0;
    for (i = 0; i < Team.length; i++) {
        sum += Team[i].health;
        console.log(Team[i].health);
    };
    console.log(sum);
    
    return sum/Team.length;
};

function average_experience (Team) {
    let sum = 0;
    for (i = 0; i < Team.length; i++) {
        sum += Team[i].experience;
    };
    return sum/Team.length;
};

function report_status (iteration) {
    let alive_Red = alive_members(Team_Red);
    let average_health_Red = average_health(Team_Red);
    let alive_Blue = alive_members(Team_Blue);
    let average_health_Blue = average_health(Team_Blue);
    let average_experience_Blue = average_experience(Team_Blue);
    console.log(`Iteration ${iteration}`)
    console.log(`Blue Team Warriors alive: ${alive_Blue} Average health on Blue Team: ${average_health_Blue}`);
    console.log(`Red Team Warriors alive: ${alive_Red} Average health on Red Team: ${average_health_Red}`);
    console.log(`Blue TeamAverage_experience ${average_experience_Blue}`)
};

function war () {
    init_army(Team_Blue, Team_Blue_size);
    init_army(Team_Red, Team_Red_size);

    let iteration = 1;

    while (get_num_of_alive_team_members(Team_Red) > 0 && get_num_of_alive_team_members(Team_Blue) > 0) {
        draw_sequence();
    
        let n_Red = Team_Red.length;
        let n_Blue = Team_Blue.length;

        if (n_Red >= n_Blue) {
            for (i = 0; i < n_Blue; i++) {
                duel(Team_Red[i], Team_Blue[i]);
            };
        }

        else {
            for (i = 0; i < n_Red; i++) {
                duel(Team_Red[i], Team_Blue[i]);
            };
        };

        report_status(iteration);
        iteration++;
    };

    if (Team_Blue === 0) {
        console.log("Blue Team has lost all warriors, Red Team wins");
    }

    else if (Team_Red === 0) {
        console.log("Red Team has lost all warriors, Blue Team wins");
    };
};
war();