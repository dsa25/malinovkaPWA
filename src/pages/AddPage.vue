<template>
  <div>
    <MyLabel for="datalistFor01" class="block mb-1">
      Выбрать номер участка:
      <span class="text-red-500">*</span>
    </MyLabel>
    <model-select
      class="wr_search_list"
      :options="sectors"
      v-model="itemSector"
      placeholder="Выбрать номер участка"
    >
    </model-select>

    <div class="flex items-center mt-4">
      <MyLabel for="date_inspection" class="whitespace-nowrap pr-3"
        >Дата осмотра:
      </MyLabel>
      <MyInput
        id="date_inspection"
        v-model="myData.dateInspection"
        :type="'date'"
        class="disabled:opacity-50"
        disabled
      />
    </div>

    <div class="flex items-center mt-4">
      <MyLabel for="number_PU" class="whitespace-nowrap pr-3"
        >Номер ПУ:
      </MyLabel>
      <MyInput
        v-model="myData.numberPU"
        id="number_PU"
        class="font-bold disabled:opacity-90"
        disabled
      />
    </div>

    <div class="flex items-center mt-4">
      <MyLabel for="type_PU" class="whitespace-nowrap pr-3">Тип ПУ: </MyLabel>
      <MyInput
        v-model="myData.typePU"
        id="type_PU"
        class="disabled:opacity-50"
        disabled
      />
    </div>

    <div class="flex items-center mt-4">
      <MyLabel for="date_pu" class="whitespace-nowrap pr-3"
        >Дата выпуска ПУ:
      </MyLabel>
      <MyInput
        :type="'date'"
        v-model="myData.datePU"
        :value="myData.datePU"
        id="date_pu"
      />
    </div>

    <MyLabel class="block mt-4 mb-1"
      >Показания: <span class="text-red-500">*</span></MyLabel
    >

    <div class="flex items-center mt-3">
      <MyLabel for="kp_day" class="whitespace-nowrap pr-3"> КП день: </MyLabel>
      <MyInput
        v-model="myData.kpDay"
        :value="myData.kpDay"
        id="kp_day"
        inputmode="numeric"
        autocomplete="off"
      />
    </div>

    <div class="flex items-center mt-4">
      <MyLabel for="kp_night" class="whitespace-nowrap pr-3">
        КП ночь:
      </MyLabel>
      <MyInput
        v-model="myData.kpNight"
        :value="myData.kpNight"
        id="kp_night"
        inputmode="numeric"
        autocomplete="off"
      />
    </div>

    <div class="flex items-center mt-4">
      <MyLabel for="kp_total" class="whitespace-nowrap pr-5"> Общее: </MyLabel>
      <MyInput
        v-model="myData.kpTotal"
        id="kp_total"
        inputmode="numeric"
        autocomplete="off"
      />
    </div>

    <div class="pt-4">
      <div v-if="myData.srcPhoto.length">
        <div
          v-for="item in myData.srcPhoto"
          :key="item"
          class="flex items-center mt-2"
        >
          <div class="max-w-[50%]">
            <img :src="item" />
          </div>
          <MyBtn @click="removeImg(item)" class="btn btn_close btn_svg mx-auto">
            <svg class="svg_icon">
              <use xlink:href="@/assets/sprite.svg#close"></use>
            </svg>
          </MyBtn>
        </div>
      </div>

      <AddPhoto @change:file="getPhoto" class="mt-4">
        <span class="whitespace-nowrap pr-2">
          <span v-if="!myData.srcPhoto.length">
            сделать фото <span class="text-red-500">* </span></span
          >
          <span v-if="myData.srcPhoto.length">еще фото</span>
        </span>
      </AddPhoto>
    </div>

    <div class="mt-4">
      <MyLabel for="notation" class="whitespace-nowrap pr-5 mb-1"
        >Примечания:
      </MyLabel>
      <MyTextarea
        v-model="myData.notation"
        id="notation"
        placeholder="Необязательно"
      />
    </div>

    <div class="flex items-center mt-4">
      <MyLabel for="user_1" class="whitespace-nowrap pr-3">
        Исполнитель:
        <span class="text-red-500">*</span>
      </MyLabel>
      <MySelect v-model="myData.user" :options="usersForSelect" id="user_1" />
    </div>

    <div class="flex items-center justify-between pt-5 pb-3">
      <MyBtn class="btn_danger mr-3" @click="cancel">Отмена</MyBtn>
      <MyBtn class="btn_success" @click="save">Сохранить</MyBtn>
    </div>

    <!-- <div>{{ inspections.length }}</div>
    <pre>{{ myData }}</pre>
    <pre>{{ emptyData }}</pre>
    <div>{{ userName }}</div>
    <pre>{{ sectors }}</pre> -->
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue"
import { getTime, deepClone } from "@/func.js"
import useInspections from "@/hooks/useInspections"
import useUsers from "@/hooks/useUsers"
import usePhoto from "@/hooks/usePhoto"
import { ModelSelect } from "vue-search-select"

import {
  get as getDB,
  set as setDB,
  del as delKeyDB,
  clear as clearDB
} from "idb-keyval"

export default {
  name: "AddPage",
  components: {
    ModelSelect
  },
  setup(props) {
    let itemSector = ref({
      value: "",
      text: ""
    })
    let emptyData = {
      user: "",
      address: "",
      dateInspection: "",
      numberPU: "",
      typePU: "",
      datePU: "",
      kpDay: "",
      kpNight: "",
      kpTotal: "",
      srcPhoto: [],
      notation: "",
      idLoc: 0,
      status: 0,
      idSector: -1
    }
    let myData = ref(deepClone(emptyData))

    let sectors = ref([])

    const sectorsFS = () => {
      return sectors.value.map((item) => {
        item.value = item.id
        // item.text = `${item.street} ${item.houseNum}${item.litera}`
        item.text = `${item.numberPU} ${item.street} ${item.houseNum}${item.litera}`
      })
    }

    const getSectors = async () => {
      try {
        let sectorsDB = await getDB("sectors")
        sectorsDB = sectorsDB ?? []
        sectors.value = sectorsDB
        sectorsFS()
        console.log(sectors.value)
        if (sectors.value.length == 0) {
          alert("Не загружены участки!")
          return []
        }
        return sectors.value
      } catch (e) {
        console.log(e)
      }
    }

    const { userName, usersForSelect, updateUserName } = useUsers()
    const { inspections, addInspection, sendInspection } = useInspections()
    const { getCompressPhoto } = usePhoto()

    // onMounted(getSectors)
    onMounted(async () => {
      // myData.value.user = userName.value
      await getSectors()
    })

    return {
      sectors,
      itemSector,
      myData,
      emptyData,
      addInspection,
      sendInspection,
      inspections,
      usersForSelect,
      userName,
      updateUserName,
      getCompressPhoto
    }
  },
  methods: {
    removeImg(img) {
      try {
        // console.log("removeImg", img)
        let modal = confirm(`Вы точно хотите удалить фото ?`)
        if (modal) {
          this.myData.srcPhoto = this.myData.srcPhoto.filter((p) => p !== img)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getPhoto(event) {
      try {
        if (!event.target.files[0]) return
        const file = await this.getCompressPhoto(event.target.files[0])
        this.myData.srcPhoto.push(file)
        console.log({ srcPhoto: this.myData.srcPhoto })
      } catch (error) {
        console.log(error)
      }
    },
    validForm() {
      if (
        (!this.myData.idSector || this.myData.idSector == -1) &&
        (!this.myData.address || this.myData.address.trim().length == 0)
      ) {
        alert("Не выбран участок!")
        return false
      }
      if (
        this.myData?.kpDay.trim().length == 0 &&
        this.myData?.kpNight.trim().length == 0 &&
        this.myData?.kpTotal.trim().length == 0
      ) {
        alert("Укажите показание!")
        return false
      }
      if (this.myData?.srcPhoto.length == 0) {
        alert("Сделайте фото!")
        return false
      }
      if (this.myData?.user.trim().length == 0) {
        alert("Укажите исполнителя!")
        return false
      }
      return true
    },
    async save() {
      try {
        // console.log(this.myData)
        if (this.validForm()) {
          console.log("success valid ", this.inspections)
          this.myData.idLoc = this.inspections.length + 1
          await this.addInspection(this.myData)
          await this.updateUserName(this.myData.user)
          alert("Показания сохранены!")
          this.cancel()
          this.setPage("inspections")
          // await this.sendInspection(this.myData)
        }
      } catch (e) {
        console.log(e)
      }
    },
    setPage(item) {
      this.$emit("setPage", item)
    },
    cancel(val) {
      // console.log("valCancel", val)
      this.itemSector = { value: "", text: "" }
      this.myData = deepClone(this.emptyData)
      this.myData.user = this.userName
    }
  },
  watch: {
    itemSector: {
      handler(val, oldVal) {
        // console.log("pu: " + typeof val.datePU)
        let datePU = val.datePU ? getTime(val.datePU, "y-m-d") : ""
        this.myData.idSector = val.id
        this.myData.address = `${val.street} ${val.houseNum} ${val.litera}`
        this.myData.dateInspection = getTime("now", "y-m-d")
        this.myData.datePU = datePU
        this.myData.numberPU = val.numberPU
        this.myData.typePU = val.typePU
        this.myData.persNum = val.persNum
        this.myData.houseNum = val.houseNum
        this.myData.litera = val.litera
        this.myData.nameVillage = val.nameVillage
        this.myData.street = val.street
      },
      deep: true
    }
  }
}
</script>
