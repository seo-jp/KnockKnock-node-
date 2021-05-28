<template>
    <b-button type="submit" variant="outline-light" class="mb-2">{{ text }}</b-button>
</template>

<script>
export default {
    name: "Button",
    props: {
        text: String,
    },
};
</script>

<style scoped>
    .btn {
        width: 100%;
        height: 40px;
        background: rgb(165, 147, 224);
        font-size: 13px;
        color: #fff;
        border-radius: 4px;
        border: 0px solid #fff;
    }

    .btn-outline-light:hover {
        background: rgb(215 203 255);
        color: #fff;
    }

</style>