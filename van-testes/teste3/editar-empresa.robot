*** Settings ***
Library    SeleniumLibrary 
Documentation    Testes automatizados para edição de empresas
Test Setup       Abrir navegador para editar empresa
Test Teardown    Fechar navegador 
Resource    resources.robot 

*** Test Cases ***

CT03: Editar empresa com sucesso
    [Documentation]   
    [Tags]    editar    empresas
    
    Acessar página de empresas
    Editar dados da empresa
   
    Clicar em salvar alterações