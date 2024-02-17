@extends('layout.auth.main')
@section('page-title','Login')
@section('page-header')

@endsection
@section('content')
	
<div class="container">
	<div class="row justify-content-center mt-5 vh-100">
		<div class="col-lg-5">
			<div class="card shadow-lg border-1 rounded-lg mt-4">
				<div class="card-header align-items-center justify-content-between">
					<h4 class="text-center font-weight-light my-3">Task Management - Login</h3>
				</div>
				<div class="card-body">
					<p class="text-success text-center mt-0 mb-1" >Insira os dados para prosseguir</p>
					<form class="needs-validation" action="{{ route('login') }}" method="POST">
						{{@csrf_field()}}
						<div class="row">
							<div class="col-md-12">
                                <label class="mb-1" for="email">E-mail</label>
                                <input class="form-control" id="email" type="text" name="email" placeholder="name@email.com" aria-describedby="email" autofocus="" tabindex="1" />
								<x-input-error :messages="$errors->get('email')"/>
							</div>
						</div>
						<div class="row mt-2">
                            <div class="col-md-12">
                                <label class="mb-1" for="password">Password</label>
                                <input class="form-control" id="password" name="password" type="password" placeholder="***************" maxlength="255" title="Password" required/>
								<x-input-error :messages="$errors->get('password')"/>
							</div>
						</div>
						<div class="row mt-2">
							<div class="col-md-12">
								<div class="form-group d-flex justify-content-center mt-1 mb-0">
                                    <button class="btn btn-primary" type="submit">Login</button>
								</div>
							</div>
						</div>
					</form>
				</div>
                <div class="card-footer">
                    <div class="text-center text-muted small">
                        Copyright &copy; Eduardo Leite {{date('Y')}}
                    </div>
                </div>
			</div>
		</div>
	</div>
</div>

@endsection
@section('page-footer')
@endsection