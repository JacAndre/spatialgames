<template>
    <div>
        <nav class="nav bg-dark d-flex flex-column shadow-right">
            <div>
                <h1 class="mt-3">Spatial Games for Multiple Players</h1>
            </div>
            <div class="section-split"></div>
            <div class="functionality d-flex flex-column">
                <router-link :to="{ name: 'Dashboard' }"><font-awesome-icon icon="home" />Game</router-link>
                <router-link :to="{ name: 'Add' }"><font-awesome-icon icon="plus" />Create</router-link>
                <router-link :to="{ name: 'Chart' }"><font-awesome-icon icon="folder" />Charts</router-link>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        setup() {
            return {};
        },
        computed: {
            getEmail: {
                get() {
                    return this.$store.getters.getUserEmail;
                },
                set(value) {
                    this.getEmail = value;
                }
            }
        },
        methods: {
            logout() {
                this.$store.dispatch("logout");
            },
            test() {
                console.log(this.getEmail);
            }
        }
    };
</script>

<style lang="scss" scoped>
    nav {
        margin: 0px;
        min-width: 250px;
        max-width: 250px;
        min-height: 100vh;
        position: fixed;
        background: linear-gradient( to right, #a80a14c5 0%, #a80a14c5 100%, #fff 0%, #fff 0% );
        .nav-account

    {
        a

    {
        font-size: 20px;
    }

    }

    color: white;

    a {
        text-decoration: none;
        color: white;
    }

    .nav-account {
        margin-top: 10px;
        a

    {
        font-size: 20px;
    }

    .account-extras {
        a

    {
        font-size: 15px;
    }

    }
    }

    .section-split {
        margin: 20px auto;
        display: flex;
        width: 80%;
        height: 1px;
        background-color: white;
        background: rounded;
    }

    .functionality {
        svg

    {
        margin-right: 8px;
    }

    }
    }

    .shadow-right {
        box-shadow: 0 2px 22px 0 rgb(0 0 0 / 20%), 0 2px 30px 0 rgb(0 0 0 / 35%);
        -webkit-box-shadow: 0 2px 22px 0 rgb(0 0 0 / 20%), 0 2px 30px 0 rgb(0 0 0 / 35%);
        -moz-box-shadow: 0 2px 22px 0 rgb(0 0 0 / 20%), 0 2px 30px 0 rgb(0 0 0 / 35%);
    }
</style>
