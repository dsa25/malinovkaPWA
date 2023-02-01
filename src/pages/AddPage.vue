<template>
  <div>
    <MyLabel for="datalistFor01" class="block mb-1"
      >Выбрать номер участка:
    </MyLabel>
    <MyDatalist
      :options="addressList"
      :id="'datalistFor01'"
      :list="'datalist01'"
    />

    <div class="flex items-center mt-3">
      <MyLabel for="date_inspection" class="whitespace-nowrap pr-3"
        >Дата осмотра:
      </MyLabel>
      <MyInput
        id="date_inspection"
        v-model="dateInspection"
        :type="'date'"
        class="disabled:opacity-50"
        disabled
      />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="number_PU" class="whitespace-nowrap pr-3"
        >Номер ПУ:
      </MyLabel>
      <MyInput
        v-model="numberPU"
        id="number_PU"
        class="disabled:opacity-50"
        disabled
      />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="type_PU" class="whitespace-nowrap pr-3">Тип ПУ: </MyLabel>
      <MyInput
        v-model="typePU"
        id="type_PU"
        class="disabled:opacity-50"
        disabled
      />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="date_pu" class="whitespace-nowrap pr-3"
        >Дата выпуска ПУ:
      </MyLabel>
      <MyInput :type="'date'" :value="datePU" id="date_pu" />
    </div>

    <MyLabel class="block mt-4 mb-1">Показания: </MyLabel>

    <div class="flex items-center mt-3">
      <MyLabel for="kp_day" class="whitespace-nowrap pr-3">КП день: </MyLabel>
      <MyInput v-model="kpDay" :value="kpDay" id="kp_day" inputmode="numeric" />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="kp_night" class="whitespace-nowrap pr-3">КП ночь: </MyLabel>
      <MyInput
        v-model="kpNight"
        :value="kpNight"
        id="kp_night"
        inputmode="numeric"
      />
    </div>

    <div class="flex items-center mt-3">
      <MyLabel for="kp_total" class="whitespace-nowrap pr-5">Общее: </MyLabel>
      <MyInput v-model="kpTotal" id="kp_total" inputmode="numeric" />
    </div>

    <div class="flex items-center pt-4">
      <div v-if="srcPhoto" class="max-w-[50%]">
        <img :src="srcPhoto" />
      </div>
      <div class="mx-auto p-1">
        <AddPhoto @change:file="getPhoto" />
      </div>
    </div>

    <div class="mt-3">
      <MyLabel for="notation" class="whitespace-nowrap pr-5 mb-1"
        >Примечания:
      </MyLabel>
      <MyTextarea
        v-model="notation"
        id="notation"
        placeholder="Необязательно"
      />
    </div>

    <div class="flex items-center justify-between pt-5">
      <MyBtn class="btn_danger mr-3" @click="cancel">Отмена</MyBtn>
      <MyBtn class="btn_success" @click="save">Сохранить</MyBtn>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPage",
  props: {
    itemPage: String
  },
  data() {
    return {
      address: "",
      dateInspection: "",
      numberPU: "",
      typePU: "",
      datePU: "",
      kpDay: "",
      kpNight: "",
      kpTotal: "",
      photo: "",
      srcPhoto: "",
      notation: "",
      addressList: [
        "A Throne Too Far",
        "The Cat Wasn't Invited",
        "You Only Meow Once",
        "Catless in Seattle"
      ]
    }
  },
  methods: {
    getPhoto(event) {
      console.log(event)
      const files = event.target.files
      console.log({ files })
      console.log(files.length)
      if (files.length < 1) return

      console.log("files_length")
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => (this.srcPhoto = reader.result)
    },
    save(val) {
      this.$emit("setPage", "list")
    },
    cancel(val) {
      console.log("valCancel", val)
    }
  }
}
</script>
