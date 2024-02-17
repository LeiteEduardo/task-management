<div id="layoutSidenav_content">
    <main>
        <div class="container-content-title p-0 mt-2 mx-2">
            @yield('content-title')
        </div>
        @include('layout.app.breadcrumbs')

        <div class="container-content mb-2 ms-3 me-3">
            @yield('content')
        </div>
    </main>