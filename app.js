function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            round: 0,
            winner:null,
        }
    },
    methods: {
        attackMonster() {
            this.round++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttack() {
            this.round++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        heal() {
            this.round++
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        },
        surrender(){
            this.round++;
            this.playerHealth=0;
        }
    },
    computed: {
        monsterBar() {
            if (this.monsterHealth <= 0) {
                return { display: "none" }
            } else {
                return { width: this.monsterHealth + '%' }
            }
        },
        playerBar() {
            if (this.playerHealth <= 0) {
                return { display: "none" }
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
                this.winner='draw'
            } else if (value <= 0) {
                // lost
                this.winner='monster'
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // return a draw
                this.winner='draw'
            } else if (value <= 0) {
                // win
                this.winner='player'
            }
        }
    }
})
app.mount('#game')