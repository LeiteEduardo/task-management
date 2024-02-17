<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthService
{
    public function login(array $loginRequest): bool
    {
        if (Auth::attempt(['email' => $loginRequest['email'], 'password' => $loginRequest['password']])) {
            Session::regenerate();

            Session::flash('success', 'Login successfully');
            return true;
        }

        Session::flash('error', 'The provided credentials do not match our records.');
        return false;
    }

    public function logout()
    {
        Auth::logout();
        Session::flash('success', 'Logout successfully');
    }
}
