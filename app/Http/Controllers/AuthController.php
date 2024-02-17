<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function __construct(private AuthService $authService) {
        $this->authService = $authService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Auth::logout();
        return view('pages.login.index');
    }

    public function login(LoginRequest $loginRequest)
    {
        $this->authService->login($loginRequest->all());

        return redirect('home');
    }

    public function logout()
    {
        $this->authService->logout();

        return redirect('login');
    }
}
