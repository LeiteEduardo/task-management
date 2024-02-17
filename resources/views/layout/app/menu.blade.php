<div id="layoutSidenav">
    <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion" style="background: #101223;">

            <div class="sb-sidenav-menu">
                <div class="nav">
                    <div class="sb-sidenav-menu-heading">Pages</div>
                    <a class="nav-link" href="{{route('home')}}">
                        <i class="fa-solid fa-home me-2"></i>
                        Home
                    </a>
                    <a class="nav-link" href="{{route('users.index')}}">
                        <i class="fa-solid fa-users me-2"></i>
                        Users
                    </a>
                    <a class="nav-link" href="{{route('home')}}">
                        <i class="fa-solid fa-tasks me-2"></i>
                        Tasks
                    </a>
                </div>
            </div>

            <div class="sb-sidenav-footer" style="background: #181c35;">
                <div class="small"><b>User:</b> {{ Auth::user()->name }}</div>
            </div>
        </nav>
    </div>