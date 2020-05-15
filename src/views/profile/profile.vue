<template>
    <div id="profile" class="w-full flex-col">
        <ProfileItem class="mt-32" v-for="item in getProfile" v-bind:key="item.id" v-bind:profile="item" />
    </div>
</template>
<script>
import ProfileItem from "../../components/ProfileItem";
import store from "../../store";

export default {
    components: {
        ProfileItem
    },
    computed: {
        getProfile() {
            return store.state.profile;
        }
    }
}
</script>