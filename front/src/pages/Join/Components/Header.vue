<template>
    <header>
        <div>
            
            <a
            class="left-btn"
            v-show="navId != 0"
            @click="$emit('step',navId - 1)">
                <b-icon icon="arrow-return-left" flip-v></b-icon>
            </a>

            <h2>{{ lists[navId].text }} 설정</h2>

        </div>
        
        <nav class="mb-5" v-show="navId != 0">
            <ul>
                <li v-show="list.id > 0" :key="list.id" v-for="list in lists">
                    <a :class="[list.point ? 'point' : '', 'list']">{{ list.text }}</a>
                </li>
            </ul>
        </nav>
    </header>


</template>

<script>

export default {
    name: "Header",
    props: {
        navId: Number,
    },
    data() {
      return {
        lists: [],
      }
    },
    methods: {

        // 메뉴 클릭 시 강조표시(using : all)
        changePoint(navId) {
          this.lists = this.lists.map((list) => list.id == navId
          ? {...list, point: true} : {...list, point: false})
        },
    },
    created() {
    this.lists = [
      {
        id: 0,
        text: '유저정보',
        point: false,
      },  
      {
        id: 1,
        text: '프로필',
        point: false,
      },
      {
        id: 2,
        text: '키워드',
        point: false,
      },
      {
        id: 3,
        text: '피드',
        point: false,
      },
    ],
    this.changePoint(this.navId)
    },
    beforeUpdate() {
      this.changePoint(this.navId) 
    }
};
</script>
