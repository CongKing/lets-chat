<template>
    <div class="search-bar">
      <div class="search-bar__title">chats</div>
      <div class="search-bar__glass">
        <img class="search-bar__glass-icon" src="~/static/image/icon/search.png" slot="icon">
      </div>
    </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style lang="scss" scoped>
@import '~/static/css/common.scss';
.search-bar {
  @extend .border-abs-bottom;
  display: flex;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  background-color: #f4f4f4;

  &__glass {
    @include flex-c-c;
    width: 25%;
    justify-content: flex-end;
    padding-right: 15px;

    &-icon {
      width: 20px;
      height: 20px;
    }
  }

  &__title {
    @include flex-c-c;
    flex: 1;
    padding-left: 12px;
    text-transform: capitalize;
  }
}
</style>
