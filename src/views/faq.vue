<template>
    <div class="container w-full flex-col">
        <div id="faq" class="text-xl mt-24 mb-24 flex-col justify-around w-full md:px-48">
            <h4 class="text-2xl">FAQ</h4>
            <div id="list" class="w-full px-6 md:px-16 mt-12">
                <ul v-for="item in faq" :key="item.id" class="mt-2 border border-bg_secondary py-4 px-6">
                    <div v-on:click="pushQ('q' + item.id)" class="question cursor-pointer">
                        {{item.q}}
                    </div>
                    <div :class="get_height('q' + item.id)" class="answer text-justify mt-2">
                        {{item.a}}</div>
                </ul>
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                faq: {
                    "q1": {
                        "id": "1",
                        "q": "What is Farmify?",
                        "a": "Farmify is the most user-friendly app to help you find Farm work in Australia within seconds!"
                    },
                    "q2": {
                        "id": "2",
                        "q": "What features are included?",
                        "a": "Everything you will need to find a job on a farm! Our web-app includes map, database, saving farm options, tons of filters to personalize your search and much more!"
                    },
                    "q3": {
                        "id": "3",
                        "q": "How is it different from services that also help you find farms in Australia?",
                        "a": "Simple Answer: We have more data and we provide a better user experience! We did the research, our database includes more possible places to work than all the services that already exist. And we think the way we designed our web-app will give you a much better experience looking for work."
                    },
                    "q4": {
                        "id": "4",
                        "q": "I have used similar services like yours and the data provided wasn’t right. Is your data always up-to-date?",
                        "a": "Yes, it is! We check our data weekly to ensure that all information provided on the map and in the database is still valid. Since we want you to have the best user experience possible, this is our promise to you!"
                    },
                    "q5": {
                        "id": "5",
                        "q": "Will the app be available for iPhones and Android Phones?",
                        "a": "Currently our app is available as a web-app service using your mobile phone browser or your notebook browser. However there will be an app available for Apple and Android devices in the near future."
                    },
                    "q6": {
                        "id": "6",
                        "q": "Do I need to pay to use your service?",
                        "a": "Right now we don’t take any money for using our service. Sign up at the end of the page and get a free lifetime membership for testing the app. After official launch of the service we will take a small one time fee to cover our hosting and development expenditures."
                    },
                    "q7": {
                        "id": "7",
                        "q": "When will the web-app be launched?",
                        "a": "We are still keen to improve our web-app wherever we can to provide you with the best user experience possible. We don’t have a specific date yet but official launching will be somewhere around July 2020."
                    }
                },
                highlightedA: "",
                activeQ: ""
            }
        },
        methods: {
            pushQ(id) {
                this.highlightedA = this.faq[id]["a"];
                this.activeQ = id;
                return 0;
            },
            get_class(id) {
                if (this.activeQ == id) {
                    return "text-main_focus"
                } else {
                    return "text-main_primary"
                }
            },
            get_height(id) {
                if (this.activeQ == id) {
                    return "italic"
                } else {
                    return "hidden"
                }
            }
        }
    }
</script>