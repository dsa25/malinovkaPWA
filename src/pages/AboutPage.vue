<template>
  <div>
    <h1>about page</h1>
    <br />

    <div v-show="icons" class="icoicoico text-green-400">
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#history_solid"></use>
        </svg>
        <span>history_solid</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#close"></use>
        </svg>
        <span>close</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#check_list"></use>
        </svg>
        <span>check_list</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#check2"></use>
        </svg>
        <span>check2</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#check"></use>
        </svg>
        <span>check</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#actoion"></use>
        </svg>
        <span>actoion</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#alarm"></use>
        </svg>
        <span>alarm</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#answer"></use>
        </svg>
        <span>answer</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#calendar_icon"></use>
        </svg>
        <span>calendar_icon</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#download"></use>
        </svg>
        <span>download</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#arrow_buy"></use>
        </svg>
        <span>arrow_buy</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#arrow_left"></use>
        </svg>
        <span>arrow_left</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#arrow_sell"></use>
        </svg>
        <span>arrow_sell</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#arrow_left_solid"></use>
        </svg>
        <span>arrow_left_solid</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#chat"></use>
        </svg>
        <span>chat</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#dashboard_customize"></use>
        </svg>
        <span>dashboard_customize</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#flag"></use>
        </svg>
        <span>flag</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#logout"></use>
        </svg>
        <span>logout</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#packet"></use>
        </svg>
        <span>packet</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#packets"></use>
        </svg>
        <span>packets</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#search"></use>
        </svg>
        <span>search</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#send"></use>
        </svg>
        <span>send</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#settings"></use>
        </svg>
        <span>settings</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#star"></use>
        </svg>
        <span>star</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#user"></use>
        </svg>
        <span>user</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#settings_circle"></use>
        </svg>
        <span>settings_circle</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#plus"></use>
        </svg>
        <span>plus</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#delete"></use>
        </svg>
        <span>delete</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#edit"></use>
        </svg>
        <span>edit</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#clip"></use>
        </svg>
        <span>clip</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#history_solid"></use>
        </svg>
        <span>history_solid</span>
      </p>
      <p>
        <svg class="svg_icon">
          <use xlink:href="@/assets/sprite.svg#save"></use>
        </svg>
        <span>save</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      icons: 1
    }
  }
}
</script>

<style scoped>
.icoicoico .svg_icon {
  height: 25px;
}
p {
  padding: 3px 0;
}
</style>
