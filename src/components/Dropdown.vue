<template>
    <div class="Dropdown">
        <p @click="showOptions = true ? showOptions == false : false">{{activeOption}}</p>
        <div v-if="showOptionsHandler" class="absolute bg-main_primary border-2 selection-list z-20">
            <li>
                <ul @click="handleSelect(item)" class="py-2 px-2 hover:bg-main_secondary" v-for="item in options" :key="item">
                    {{item}}
                </ul>
            </li>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['items'],
        data() {
            return {
                options: this.items.options,
                activeOption: 'No Filter',
                showOptions: false
            }
        },
        computed: {
            showOptionsHandler() {
                return this.showOptions;
            }
        },
        methods: {
            handleSelect(item) {
                this.activeOption = item;
                this.showOptions = false
                this.$emit('selectOption')
            }
        }
    }
</script>