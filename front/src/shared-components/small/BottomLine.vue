<template>

    <div>
        <hr />
        <b-link :href=url class="id-link w-100 float-left text-center mt-4"> {{ text }} <strong>{{ point }}</strong> </b-link>
    </div>

</template>

<script>
export default {
    name: "BottomLine",
    props: {
        url: String,
        text: String,
        point: String,
    },
};
</script>

<style>
    @import '../../assets/css/Login.css';
</style>