(function () {
    'use strict';

    describe('services.colomboapi', function () {
        describe('ColomboAPI', function () {
            var ColomboAPI, converter, $httpBackend;
            beforeEach(function () {
                converter = jasmine.createSpyObj('ColomboAPIConverter', ['convertGamesData']);
                function providerOverride($provide) {
                    $provide.value('ColomboAPIConverter', converter);
                }
                module('services.colomboapi', providerOverride);
                inject(function (_ColomboAPI_, _$httpBackend_) {
                    ColomboAPI = _ColomboAPI_;
                    $httpBackend = _$httpBackend_;
                });
            });

            it('should run here few assertions', function () {
                expect(ColomboAPI).toBeDefined();
            });
        });
    });
})();
