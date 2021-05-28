<template>
    <div style="width:320px; margin:0 auto;">
        
        <h1>logo</h1>

        <div class="message">
            <p>{{ text }}</p>
        </div>

        <BottomLine text="로그인 페이지로 돌아가기" url="/Login" />

    </div>
</template>

<script>

import BottomLine from '../../shared-components/small/BottomLine.vue'

export default {
    name: "Message",
    components: {
        BottomLine,
    },
    data() {
      return {
        text: this.$route.params.text,
      }
    },
}
</script>

<style>
    @import '../../assets/css/Login.css';
</style>
