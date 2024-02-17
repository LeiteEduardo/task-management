 <nav class="sb-topnav navbar navbar-expand navbar-dark" style="background: #181c35;">
    <!-- Navbar Brand-->
    <a class="navbar-brand ps-3" href="{{route('home')}}">Task</a>
    <!-- Sidebar Toggle-->
    <button class="btn btn-link btn-outline-secondary btn-sm order-1 order-lg-0 mx-2" id="sidebarToggle" href="#!"><i class="fas fa-bars m-0"></i></button>

    <!-- Navbar-->
    <ul class="navbar-nav ms-auto me-0 me-md-3 my-2 my-md-0">
        <li>
            <a class="nav-link active" href="#">
                
                My Account
            </a>
        </li>
        <li><a class="nav-link active" href="{{ route('logout') }}">Logout</a></li>
    </ul>

</nav>