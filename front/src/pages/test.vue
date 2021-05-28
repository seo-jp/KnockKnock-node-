<template>
    <div style="width:320px; margin:0 auto;">

        <h1>test</h1>
        {{ categories }}

        <a href="/login">로그인</a>

    </div>
</template>

<script>

    export default {
        name: "test",
        created() {
            this
                .$axios
                .get('http://localhost:3000/api/category')
                .then((response) => {
                    this.categories = response.data
                    console.log(response.data)
                })
        },
        data() {
            return {categories: []}
        }
    }
</script>