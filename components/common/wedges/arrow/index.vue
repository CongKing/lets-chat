<template>
    <div class="arrow-wrapper">
        <div class="arrow-wrapper__item"></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import '~/static/css/common.scss';

.arrow-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    &__item {
        @include arrow-left;
    }
}
</style>