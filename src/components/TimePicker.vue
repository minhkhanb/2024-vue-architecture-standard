<script setup lang="ts">
import { computed, reactive, ref } from "vue";

// const props = defineProps<{
//   hour: number;
//   minute: number;
// }>();

// eslint-disable-next-line no-redeclare
const emits = defineEmits<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (e: "send-data", val: any): void;
}>();
const isOpen = ref(false);
const isEdit = ref(true);
const isValidate = ref(false);
const time = reactive({
  hour: 0,
  minute: 0,
});

const handleDownHours = () => {
  time.hour = time.hour - 1;
  emits("send-data", time.hour);
};
const handleDownMinute = () => {
  time.minute = time.minute - 1;
};
const handleUpHours = () => {
  time.hour = time.hour + 1;
};
const handleUpMinute = () => {
  time.minute = time.minute + 1;
};

const handleBlurTimePicker = () => {
  if (isValidate.value) {
    console.log('validate')
    isEdit.value = false;
    isOpen.value = false;
    return;
  }
  if (!isOpen.value) {
    isOpen.value = false;
    isEdit.value = true;
  }
  console.log('data: ', isEdit.value, isValidate.value)
};

const handleFocusTimePicker = (event: any) => {
  // const input = (event.target as HTMLElement).closest("#time-picker-input");
  // if (!isOpen.value) {
  //   console.log("qqqqqqqqqqqqqqqqq");
  //   isOpen.value = true;
  //   isEdit.value = false;
  // }
};

document.addEventListener("click", (event: MouseEvent) => {
  const panel = (event.target as HTMLElement).closest("#time-picker-panel");
  const input = (event.target as HTMLElement).closest("#time-picker-input");
  if (isValidate.value) {
    return;
  }
  if (input || panel) {
    if (isOpen.value && panel) {
      console.log("ddddddddddd");
      return;
    }
    console.log("aaaaaaaaaaa", isOpen.value);
    if (isOpen.value && input && isEdit.value) {
      console.log("cccccccc");
      isEdit.value = false;
      isOpen.value = false;
      isValidate.value = true;
      return;
    }
    if (!isEdit.value) {
      console.log("eeeeeeeeeeeeee", isOpen.value);
      isOpen.value = false;
      return;
    }
    console.log("ffffffffffffffffff", isOpen.value);
    isOpen.value = true;
    console.log("ggggggggggggggggg", isOpen.value);
  } else {
    console.log("bbbbbbbbbbbb");
    isOpen.value = false;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("time-picker-input");
  if (el) {
    el.addEventListener("focusin", (event) => {
      console.log("focus int item: ");
    });
  }
});

const formatTime = (time: number) => {
  return time.toString().padStart(2, "0");
};
const getTime = computed(() => {
  return `${formatTime(time.hour)}:${formatTime(time.minute)}:00`;
});
</script>

<template>
  <div>
    <v-text-field
      id="time-picker-input"
      v-model="getTime"
      :readonly="isEdit"
      @blur="handleBlurTimePicker"
      @focus="handleFocusTimePicker"
    />
    <div
      v-show="isOpen"
      id="time-picker-panel"
    >
      <div class="panel-hour">
        <button @click="handleUpHours">
          <v-icon icon="mdi-menu-up" />
        </button>
        <div>{{ formatTime(time.hour) }}</div>
        <button @click="handleDownHours">
          <v-icon icon="mdi-menu-down" />
        </button>
      </div>
      <div>:</div>
      <div class="panel-minute">
        <button @click="handleUpMinute"><v-icon icon="mdi-menu-up" /></button>
        <div>{{ formatTime(time.minute) }}</div>
        <button @click="handleDownMinute">
          <v-icon icon="mdi-menu-down" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
#time-picker-panel {
  font-size: 1rem;
  font-weight: 600;
  border: 1px solid rgb(237, 226, 226);
  display: flex;
  align-items: center;
  float: inline-end;
}

.panel-hour {
  padding: 1rem;
}

.panel-minute {
  padding: 1rem;
}
</style>
