function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            round: 0,
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
        }
    },
    computed: {
        monsterBar() {
            if (this.monsterHealth < 0) {
                return { display: "none" }
            } else {
                return { width: this.monsterHealth + '%' }
            }
        },
        playerBar() {
            if (this.playerHealth < 0) {
                return { display: "none" }
            } else {
                return { width: this.playerHealth + '%' }
            }
        },
        turningOf() {
            return this.round % 3 !== 0;
        }
    }
})
app.mount('#game')