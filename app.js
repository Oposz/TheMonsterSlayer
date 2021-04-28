function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            round: 0,
            winner: null,
            logs:[]
        }
    },
    methods: {
        attackMonster() {
            this.round++;
            const attackValue = getRandomValue(5, 12);
            const attackDisplay=`Player dealt ${attackValue}`
            this.monsterHealth -= attackValue;
            this.logs.push(attackDisplay);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            const attackDisplay=`Monster dealt ${attackValue}`
            this.logs.push(attackDisplay);
            this.playerHealth -= attackValue;
        },
        specialAttack() {
            this.round++;
            const attackValue = getRandomValue(10, 25);
            const attackDisplay=`Player dealt ${attackValue}`
            this.monsterHealth -= attackValue;
            this.logs.push(attackDisplay);
            this.attackPlayer();
        },
        heal() {
            this.round++
            const healValue = getRandomValue(8, 20);
            const healDisplay=`Player healed ${healValue}`
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.logs.push(healDisplay);
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
            const surrenderDisplay=`Player Surrendered`
            this.logs.push(surrenderDisplay);
            // this.playerHealth=0;
        },
        newGame() {
            this.round = 0;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.logs=[];
        }
    },
    computed: {
        monsterBar() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: this.monsterHealth + '%' }
            }
        },
        playerBar() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            } else {
                return { width: this.playerHealth + '%' }
            }
        },
        turningOf() {
            return this.round % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // a draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // lost
                this.winner = 'monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // return a draw
                this.winner = 'draw'
            } else if (value <= 0) {
                // win
                this.winner = 'player'
            }
        }
    }
})
app.mount('#game')