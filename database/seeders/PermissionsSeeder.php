<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

            // Create roles
            $adminRole = Role::create(['name' => 'admin']);
            $trainerRole = Role::create(['name' => 'trainer']);
            $clientRole = Role::create(['name' => 'client']);

            // Create permissions
            $editAll = Permission::create(['name' => 'edit all']);
            $editPermission = Permission::create(['name' => 'edit articles']);
            $viewPermission = Permission::create(['name' => 'view articles']);

            // Assign permissions to roles
            $adminRole->givePermissionTo($editAll, $editPermission, $viewPermission);
            $trainerRole->givePermissionTo($editPermission, $viewPermission);
            $clientRole->givePermissionTo($viewPermission);

            // Assign role to user
            $user = User::find(1);
            $user->assignRole('admin');

            $user = User::find(2);
            $user->assignRole('trainer');

            $user = User::find(3);
            $user->assignRole('client');

    }
}
