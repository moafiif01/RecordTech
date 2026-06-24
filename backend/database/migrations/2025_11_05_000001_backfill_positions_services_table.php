<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Backfill NULL positions by assigning sequential positions after the current max.
     *
     * @return void
     */
    public function up()
    {
        DB::transaction(function () {
            // find current max position (0 if none)
            $max = DB::table('services')->whereNotNull('position')->max('position');
            $max = $max ?? 0;

            // select rows that need a position, order by id for deterministic assignment
            $rows = DB::table('services')->whereNull('position')->orderBy('id')->pluck('id');

            $pos = (int) $max;
            foreach ($rows as $id) {
                $pos++;
                DB::table('services')->where('id', $id)->update(['position' => $pos]);
            }
        });
    }

    /**
     * Reverse the migrations.
     * We intentionally do not rollback backfilled positions.
     *
     * @return void
     */
    public function down()
    {
        // no-op: positions assigned by this migration are considered permanent
    }
};
