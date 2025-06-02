<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InventoryItemsController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\StockinController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InventoryRequestsController;
use App\Http\Controllers\RISController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Here is where you can register web routes for your application.
| These routes are loaded by the RouteServiceProvider and all of them
| will be assigned to the "web" middleware group. Make something great!
|
*/

// Public Routes
Route::get('/', [RequestController::class, 'index']);
Route::get('login', [AuthController::class, 'index'])->name('login');
Route::post('login', [AuthController::class, 'login'])->name('auth.login');

Route::prefix('items/request')->group(function () {
    Route::get('/', [RequestController::class, 'index']);
    Route::post('/', [RequestController::class, 'store'])->name('request.store');
    Route::get('/sent', [RequestController::class, 'requestSent'])->name('request.sent');
});

// Staff Request Routes
Route::prefix('inventory/requests')->group(function () {
    Route::get('/', [InventoryRequestsController::class, 'index']);
    Route::get('/details/{requestsummaryid}', [InventoryRequestsController::class, 'show'])->name('requests.show');
    Route::put('/acknowledge/{requestsummaryid}', [InventoryRequestsController::class, 'acknowledge'])->name('requests.acknowledge');
});

// Admin Routes

// Inventory Items
Route::prefix('inventory/items')->controller(InventoryItemsController::class)->group(function () {
    Route::get('/', 'index');
    Route::get('/available', 'availabeItems')->name('items.available');
    Route::post('/breakdown', 'getItemsBreakDown')->name('items.breakdown');
    Route::put('/{invitemsid}', 'update')->name('items.update');
    Route::delete('/{invitemsid}', 'destroy')->name('items.destroy');
});

// RIS
Route::prefix('inventory/ris')->controller(RISController::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store')->name('ris.store');
    Route::get('/data/{empnumber}', 'employeee_ris')->name('ris.employee_ris');
});

// Stock In
Route::resource('inventory/stock-in', StockinController::class);
