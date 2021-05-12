<template>
    <nav class="navbar sticky-top navbar-expand-lg">
        <div class="w-100">
            <form class="d-flex flex-col items-center input-group w-50 mx-auto">
                <div class="w-100 d-flex flex-row p-0">
                    <input type="search"
                           class="form-control z-10"
                           id="search-bar"
                           placeholder="Search Name"
                           aria-label="Search"
                           autocomplete="off"
                           v-model="card"
                           @input="filterCards"
                           @focus="update" />
                    <button class="btn btn-danger"
                            type="button"
                            data-mdb-ripple-color="dark"
                            @click="submit">
                        <font-awesome-icon icon="search" />
                    </button>
                </div>
                <div class="w-100" id="search-cards" v-if="filteredCards && modal">
                    <div>
                        <div id="blanket" @click="killModal"></div>
                        <input type="text" class="list-group-item py-2 my-1" id="suggest" v-for="filteredCard in filteredCards.slice(0,5)" v-bind:key="filteredCard" :value="filteredCard.data().series[0].title" @click="setCard(filteredCard)" />
                    </div>
                </div>
            </form>
        </div>
    </nav>
</template>

<script>
    import { db } from '../firebase';
    export default {
        data: function () {
            return {
                card: '',
                storedDoc: null,
                docs: [],
                filteredCards: [],
                modal: false,
            };
        },
        mounted: function () {
            this.findCharts();
        },
        methods: {
            findCharts() {
                db.collection("agentCollection").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.docs.push(doc);
                    });

                    console.log(this.docs);
                });
            },
            update() {
                this.modal = true;
                this.filteredCards = [];
            },
            filterCards() {
                this.filteredCards = [];
                this.docs.forEach((doc) => {
                    const docId = doc.id;
                    const docTitle = doc.data().series[0].title
                    console.log(docTitle);
                    if (this.card != '' && (docId.toLowerCase().includes(this.card.toLowerCase()) || docTitle.toLowerCase().includes(this.card.toLowerCase()))) {
                        this.filteredCards.push(doc);
                    }
                });
            },
            setCard(doc) {
                this.card = doc.data().series[0].title;
                this.storedDoc = doc;
                this.modal = false;
            },
            killModal() {
                this.modal = false;
            },
            submit() {
                this.$store.state.searchID = this.storedDoc;
                this.update();
            },
        }
    };
</script>

<style scoped lang="scss">
    button {
        background: linear-gradient( to right, #a80a14c5 0%, #a80a14c5 100%, #fff 0%, #fff 100% );
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);
        height: 38px;
    }

    #mainBody {
        font-family: "Roboto", sans-serif;
    }

    #blanket {
        position: fixed;
        padding: 0;
        margin: 0;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    #suggest {
        cursor: pointer;
    }

    #search-bar,
    #suggest {
        width: 90%;
        padding: 6px 12px;
        z-index: 10;
    }

    .form-control {
        border-color: #a80a14c5;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(255, 0, 0, 0.6);
    }

    .shadow-bottom {
        box-shadow: 0 2px 22px 0 rgb(0 0 0 / 20%), 0 2px 30px 0 rgb(0 0 0 / 35%);
        -webkit-box-shadow: 0 2px 22px 0 rgb(0 0 0 / 20%), 0 2px 30px 0 rgb(0 0 0 / 35%);
        -moz-box-shadow: 0 2px 22px 0 rgb(0 0 0 / 20%), 0 2px 30px 0 rgb(0 0 0 / 35%);
    }
</style>
