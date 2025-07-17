<template>
  <div class="p-4 max-w-3xl mx-auto bg-white rounded shadow">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold">Учетные записи</h2>
      <button class="text-blue-500 text-2xl font-bold">+</button>
    </div>

    <div class="flex items-start gap-2 text-sm text-gray-600 mb-4">
      <span class="flex items-start gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
          />
        </svg>
        Для указания нескольких меток для одной пары логин/пароль используйте
        разделитель ;
      </span>
    </div>
    <!-- <span>Метки</span><span>Тип записи</span><span>Логин</span
      ><span>Пароль</span> -->

    <div class="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Метки"
        class="border rounded px-3 py-2 w-32"
      />

      <select class="border rounded px-3 py-2 w-36">
        <option>Локальная</option>
        <option>LDAP</option>
      </select>

      <input
        type="text"
        placeholder="Значение"
        class="border rounded px-3 py-2 flex-1"
      />

      <div class="relative">
        <input
          type="password"
          placeholder="Пароль"
          class="border rounded px-3 py-2 w-48"
        />
        <button class="absolute cursor-pointer right-2 top-[20%] text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Material Symbols Light by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="M12.005 15.154q1.524 0 2.586-1.067t1.063-2.591t-1.067-2.587t-2.591-1.063t-2.587 1.067t-1.063 2.592t1.067 2.586t2.592 1.063M12 14.2q-1.125 0-1.912-.787T9.3 11.5t.788-1.912T12 8.8t1.913.788t.787 1.912t-.787 1.913T12 14.2m0 3.8q-2.966 0-5.44-1.57t-3.996-4.114q-.125-.207-.178-.407t-.053-.41t.053-.41t.178-.405Q4.087 8.14 6.56 6.57T12 5t5.44 1.57t3.997 4.115q.125.205.178.405t.052.411t-.052.41t-.178.405q-1.523 2.545-3.997 4.115T12 18m0-1q2.825 0 5.188-1.487T20.8 11.5q-1.25-2.525-3.613-4.012T12 6T6.813 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17"
            />
          </svg>
        </button>
      </div>

      <button class="text-red-500 hover:text-red-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
