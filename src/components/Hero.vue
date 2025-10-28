<template>
  <section class="relative overflow-hidden rounded-lg mt-6 bg-slate-50">
    <div class="max-w-[1440px] mx-auto px-4 py-16">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <!-- Left Column: Heading & CTA -->
        <div>
          <h1 class="text-4xl font-extrabold">
            HNG TicketApp — Multi framework project
          </h1>
          <p class="mt-4 text-lg text-slate-700">
            Create, track and resolve tickets across projects. Fast, accessible,
            consistent across frameworks.
          </p>
          <div class="mt-6 flex gap-3">
            <router-link
              to="/auth/login"
              class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Login
            </router-link>
            <router-link
              to="/auth/signup"
              class="px-4 py-2 rounded border hover:bg-slate-100"
            >
              Get Started
            </router-link>
          </div>
        </div>

        <!-- Right Column: Decorative Circle + Features -->
        <div aria-hidden class="relative">
          <!-- Decorative Circle -->
          <div
            class="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-blue-100 opacity-60"
          ></div>
          <!-- Feature Cards -->
          <div class="grid grid-cols-1 gap-4">
            <div class="p-4 bg-white rounded-lg shadow">Fast ticket creation</div>
            <div class="p-4 bg-white rounded-lg shadow">Real-time validation</div>
            <div class="p-4 bg-white rounded-lg shadow">Responsive design</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wavy SVG Background -->
    <svg
      viewBox="0 0 1440 120"
      class="w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,48 C360,0 1080,96 1440,48 L1440 120 L0 120 Z"
        fill="#f1f5f9"
      />
    </svg>
  </section>
</template>

<script setup lang="ts"></script>
