<template>
    <div class="modal-box">
        
        <nav>
            <a
             v-show="keyShow"
             @click="selectCtx(curCtxId,cutCategory)"
             style="left: 20px; top:14px;">
                <b-icon
                style="width: 18px; height: 18px;"
                icon="arrow-return-left"
                flip-v />
            </a>
            
            <h4 class="text-center" v-show="ctxShow">카테고리</h4>
            <h4 class="text-center" v-show="keyShow">키워드</h4>
            
            <a
            style="right: 20px; top:12px;">
                <b-icon icon="x"
                style="width: 26px; height: 26px;"
                @click="closeModal()" />
            </a>
        </nav>

        <div class="modal-search">
            <b-form-input
            placeholder="카테고리 검색"
            v-model="searchCtg"
            v-show="ctxShow"
            />

            <b-form-input
            placeholder="키워드 검색"
            v-model="searchKwd"
            v-show="keyShow"
            />
            <a><b-icon icon="search" /></a>
        </div>

        <!-- category -->
        <ul v-show="ctxShow">
            <li :key="index" v-for="(ctx,index) in categories">
            <b-button
            @click="selectCtx(ctx.CTG_IDX,ctx.CTG_CATEGORY)"
            variant="light"
            class="modal-select-btn">
                {{ ctx.CTG_CATEGORY }}
            </b-button>    
            </li>
        </ul>

        <!-- keyword -->
        <ul v-show="keyShow">
            <li :key="index" v-for="(key,index) in keywords">
            <b-button
            v-if="curCtxId == key.KEY_CTG_IDX &&
                  key.KEY_IDX != lists[0].keyId && key.KEY_IDX != lists[1].keyId &&
                  key.KEY_IDX != lists[2].keyId && key.KEY_IDX != lists[3].keyId"
            @click="selectKey(key.KEY_IDX,key.KEY_WORD)"
            variant="light"
            class="modal-select-btn">
            {{ key.KEY_WORD }}
            </b-button>    
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    name: "Modal",
     props: {
         list: Object,
         lists: Array,
     },
     data() {
      return {
        ctxShow: true,
        keyShow: false,

        curCtxId: null,
        cutCategory: null,
        
        categories: [],
        keywords: [],

        searchCtg: null,
        searchKwd: null,
      }
    },
    created () {
        this.$axios.get('/api/common/category')
            .then((response) => {
                this.categories = response.data
        }),
        this.$axios.get('/api/common/keyword')
            .then((response) => {
                this.keywords = response.data
        })
    },
    watch: {
        searchCtg : function () {
            this.searchCategory()
        },
        searchKwd : function () {
            this.searchKeyword()
        },
    },
    methods: {
        selectCtx(id,name) {
            this.curCtxId = id
            this.cutCategory = name
            
            this.ctxShow = !this.ctxShow
            this.keyShow = !this.keyShow
        },
        selectKey(id,name) {
            this.list.category = this.cutCategory
            this.list.ctxId = this.curCtxId

            this.list.keyword = name
            this.list.keyId = id

            this.$emit('selectedList',this.list)
            this.closeModal()
        },
        closeModal() {
            this.ctxShow = true
            this.keyShow = false
            this.$emit('closeModal')
            this.onReset()
        },
        onReset() {
            this.searchCtg = ''
            this.searchKwd = ''
        },
        async searchCategory() {
            try {
                const response = await this.$axios.get(
                    `/api/common/category/${this.searchCtg}`
                )
                this.categories = response.data
            } catch (err) {
                console.log(err)
            }
        },
        async searchKeyword() {
            try {
                const response = await this.$axios.get(
                    `/api/common/keyword/${this.searchKwd}`
                )
                this.keywords = response.data
            } catch (err) {
                console.log(err)
            }
        }
    }
};
</script>
